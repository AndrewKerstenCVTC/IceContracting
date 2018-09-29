SELECT Session.SessionID, Session.DateTime, Session.Type, COUNT(Attendance.SessionID)
FROM Session
LEFT JOIN Attendance on Attendance.SessionID = Session.SessionID
GROUP BY Session.SessionID;