package edu.cvtc.ice.model;

public class Session
{
	private long id;
	private long date;
	private char type;
	
	public Session(long id, long date, char type)
	{
		setId(id);
		setDate(date);
		setType(type);
	}
	
	public long getId()
	{
		return id;
	}

	public void setId(long id)
	{
		this.id = id;
	}

	public long getDate()
	{
		return date;
	}

	public void setDate(long date)
	{
		this.date = date;
	}

	public char getType()
	{
		return type;
	}

	public void setType(char type)
	{
		this.type = type;
	}
}
