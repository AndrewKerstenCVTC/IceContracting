package edu.cvtc.ice.model;

public class Register
{
	private Member member;
	private int[] sessions;
	
	public Register()
	{
	}
	
	public Member getMember()
	{
		return member;
	}
	public void setMember(Member member)
	{
		this.member = member;
	}
	public int[] getSessions()
	{
		return sessions;
	}
	public void setSessions(int[] sessions)
	{
		this.sessions = sessions;
	}
}
