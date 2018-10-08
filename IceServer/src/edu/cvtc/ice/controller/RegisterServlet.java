package edu.cvtc.ice.controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.stream.Collectors;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.sqlite.SQLiteDataSource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import edu.cvtc.ice.model.Member;
import edu.cvtc.ice.model.Register;

@WebServlet("/Register")
public class RegisterServlet extends HttpServlet
{
	private static final long serialVersionUID = 4984986149824312373L;
	
	private SQLiteDataSource dataSource;
	private Gson gson;

	public RegisterServlet()
    {
        super();
    }
	
	@Override
	public void init(ServletConfig config) throws ServletException
	{
		super.init(config);
		
		initializeDataSource();
		gson = new GsonBuilder().setPrettyPrinting().create();
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		response.addHeader("Access-Control-Allow-Origin", "*");
		
		String string = request.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
		
		Register registerModel = gson.fromJson(string, Register.class);
		Member memberModel = registerModel.getMember();
		
		try
		(
			Connection connection = dataSource.getConnection();
			PreparedStatement queryInsertMember = connection.prepareStatement("INSERT INTO Member (USFSN, FirstName, LastName, Email, Phone, Coach, IsMember) VALUES (?, ?, ?, ?, ?, ?, ?);");
			PreparedStatement queryInsertAttendance = connection.prepareStatement("INSERT INTO Attendance (SessionID, USFSN) VALUES (?, ?);");
		)
		{
			queryInsertMember.setInt(1, memberModel.getUsfsn());
			queryInsertMember.setString(2, memberModel.getFname());
			queryInsertMember.setString(3, memberModel.getLname());
			queryInsertMember.setString(4, memberModel.getEmail());
			queryInsertMember.setString(5, memberModel.getPhone());
			queryInsertMember.setString(6, memberModel.getCoach());
			queryInsertMember.setBoolean(7, memberModel.isMember());
			queryInsertMember.executeUpdate();
			
			for (int i : registerModel.getSessions())
			{
				queryInsertAttendance.setInt(1, i);
				queryInsertAttendance.setInt(2, memberModel.getUsfsn());
				queryInsertAttendance.executeUpdate();
			}
		}
		catch (SQLException ex)
		{
			response.sendError(500);
		}
	}
	
	private void initializeDataSource()
	{
		// The connection string is pulled from an system environment variable.
		// Example connection string: "jdbc:sqlite:/path/to/database.sqlite"
		String connectionString = System.getenv("IceConnectionString");
		
		dataSource = new SQLiteDataSource();
		dataSource.setUrl(connectionString);
	}
}
