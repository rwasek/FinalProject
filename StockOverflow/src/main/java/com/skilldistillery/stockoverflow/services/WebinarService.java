package com.skilldistillery.stockoverflow.services;

import java.util.List;

import com.skilldistillery.stockoverflow.entities.User;
import com.skilldistillery.stockoverflow.entities.Webinar;

public interface WebinarService {
	
	public List <Webinar> allWebinars();
	
	public List <Webinar> index(String username);
	
	public Webinar show(int webinarId, String username);
	
	public Webinar create(String username, Webinar webinar);
	
	public Webinar update(String username, int webinarId, Webinar webinar);

	Boolean disable(String username, int webinarId);
	
	List<User> addUserToAttendees(String username, int webinarId);
	
	List<User> removeUserToAttendees(String username, int webinarId);

}
