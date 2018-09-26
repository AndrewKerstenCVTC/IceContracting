package edu.cvtc.ice.controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.time.Instant;
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
		// Establish a connection to the database
		try (Connection connection = dataSource.getConnection())
		{
			// Database doesn't currently contain any data.
			// Return some dummy data for testing.
			ArrayList<Session> sessions = new ArrayList<>();
			
			for (int i = 0; i < 8; i++)
			{
				sessions.add(new Session(i, Instant.now().toEpochMilli()));
			}
			
			response.getWriter().append(gson.toJson(sessions));
			
			// Header needed for cross origin requests
			response.addHeader("Access-Control-Allow-Origin", "*");
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
