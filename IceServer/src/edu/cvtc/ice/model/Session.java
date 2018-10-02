package edu.cvtc.ice.model;

public class Session
{
	private long id;
	private long date;
	private String type;
	private int attending;
	
	public Session() {
		setId(0);
		setDate(0);
		setType("f");
		setAttending(0);
	}
	
	public Session(long id, long date, String type, int attending)
	{
		setId(id);
		setDate(date);
		setType(type);
		setAttending(attending);
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

	public String getType()
	{
		return type;
	}

	public void setType(String type)
	{
		this.type = type;
	}
	
	public int getAttending()
	{
		return this.attending;
	}
	
	public void setAttending(int attending)
	{
		this.attending = attending;
	}
}
