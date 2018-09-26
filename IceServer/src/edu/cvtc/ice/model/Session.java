package edu.cvtc.ice.model;

public class Session
{
	private long sessionId;
	private long dateTime;
	
	public Session(long sessionId, long dateTime)
	{
		setSessionId(sessionId);
		setDateTime(dateTime);
	}

	public long getSessionId()
	{
		return sessionId;
	}

	private void setSessionId(long sessionId)
	{
		this.sessionId = sessionId;
	}

	public long getDateTime()
	{
		return dateTime;
	}

	private void setDateTime(long dateTime)
	{
		this.dateTime = dateTime;
	}
}
