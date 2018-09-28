package edu.cvtc.ice.controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.sqlite.SQLiteDataSource;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import edu.cvtc.ice.model.Session;

@WebServlet("/Sessions")
public class SessionsServlet extends HttpServlet
{
	private static final long serialVersionUID = 5473787844111298207L;
	
	private SQLiteDataSource dataSource;
	private Gson gson;

	public SessionsServlet()
	{
		super();
	}

	public void init(ServletConfig config) throws ServletException
	{
		super.init(config);
		
		initializeDataSource();
		
		gson = new GsonBuilder().setPrettyPrinting().create();
	}

	public void destroy()
	{
		super.destroy();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		// Header needed for cross origin requests
		response.addHeader("Access-Control-Allow-Origin", "*");
		
		// Establish a connection to the database
		try
		(
			Connection connection = dataSource.getConnection();
			PreparedStatement query = connection.prepareStatement("SELECT * FROM Session;");
			ResultSet result = query.executeQuery();
		)
		{
			ArrayList<Session> sessions = new ArrayList<>();
			
			while (result.next())
			{
				long sessionID = result.getLong("SessionID");
				long dateTime = result.getLong("DateTime");
				
				sessions.add(new Session(sessionID, dateTime, 'f'));
			}
			
			response.getWriter().append(gson.toJson(sessions));
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
