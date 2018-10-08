package edu.cvtc.ice.model;

public class Member
{
	private int usfsn;
	private String fname;
	private String lname;
	private String email;
	private String phone;
	private String coach;
	private boolean isMember;
	
	public Member()
	{
	}
	
	public int getUsfsn()
	{
		return usfsn;
	}
	
	public void setUsfsn(int usfsn)
	{
		this.usfsn = usfsn;
	}
	
	public String getFname()
	{
		return fname;
	}
	
	public void setFname(String fname)
	{
		this.fname = fname;
	}
	
	public String getLname()
	{
		return lname;
	}
	
	public void setLname(String lname)
	{
		this.lname = lname;
	}
	
	public String getEmail()
	{
		return email;
	}
	
	public void setEmail(String email)
	{
		this.email = email;
	}
	
	public String getPhone()
	{
		return phone;
	}
	
	public void setPhone(String phone)
	{
		this.phone = phone;
	}
	
	public String getCoach()
	{
		return coach;
	}
	
	public void setCoach(String coach)
	{
		this.coach = coach;
	}
	
	public boolean isMember()
	{
		return isMember;
	}
	
	public void setMember(boolean isMember)
	{
		this.isMember = isMember;
	}
}
