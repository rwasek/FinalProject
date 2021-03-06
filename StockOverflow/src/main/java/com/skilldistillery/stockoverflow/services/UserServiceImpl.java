package com.skilldistillery.stockoverflow.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.stockoverflow.entities.Post;
import com.skilldistillery.stockoverflow.entities.Stock;
import com.skilldistillery.stockoverflow.entities.User;
import com.skilldistillery.stockoverflow.entities.Webinar;
import com.skilldistillery.stockoverflow.repositories.PostRepository;
import com.skilldistillery.stockoverflow.repositories.UserRepository;
import com.skilldistillery.stockoverflow.repositories.WebinarRepository;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepo;
	
//	@Autowired
//	private PasswordEncoder encoder;

	@Autowired
	private WebinarRepository webRepo;
	
	@Autowired
	private PostRepository postRepo;
	
	@Override
	public User findById(int userId) {
		Optional<User> userOpt = userRepo.findById(userId);
		User user = null;
		if(userOpt.isPresent()) {
			user = userOpt.get();
		}
		return user;
	}

	@Override
	public User findByUsername(String username) {
		User user = userRepo.findByUsername(username);
		return user;
	}

	@Override
	public List<User> findUsersAttendingWebinar(int webinarId) {
		List<User> attendees = userRepo.findByWebinarsAttending_Id(webinarId);
		return attendees;
	}

	@Override
	public User updateUser(String username, User user) {
		User managedUser = userRepo.findByUsername(username);
		if(managedUser != null) {
//			managedUser.setCommentRatings(user.getCommentRatings());
//			managedUser.setComments(user.getComments());
			managedUser.setEmail(user.getEmail());
			managedUser.setEnabled(user.getEnabled());
			managedUser.setFirstName(user.getFirstName());
//			managedUser.setFlair(user.getFlair());
//			managedUser.setJournalEntries(user.getJournalEntries());
			managedUser.setLastName(user.getLastName());
//			managedUser.setPassword(encoder.encode(user.getPassword()));
//			managedUser.setPosts(user.getPosts());
			managedUser.setProfilePicture(user.getProfilePicture());
			managedUser.setRole(user.getRole());
//			managedUser.setStocks(user.getStocks());
//			managedUser.setUsername(user.getUsername());
//			managedUser.setWebinarRatings(user.getWebinarRatings());
//			managedUser.setWebinarsAttending(user.getWebinarsAttending());
//			managedUser.setWebinarsUserIsHosting(user.getWebinarsUserIsHosting());
			userRepo.saveAndFlush(managedUser);
		}
		return managedUser;
	}

	@Override
	public boolean disableUser(String username) {
		User toDisable = userRepo.findByUsername(username);
		System.err.println(toDisable.getEmail());
		boolean disabled = false;
		if(toDisable != null) {
			System.out.println("*************************");
			System.out.println(toDisable.getEnabled());
			toDisable.setEnabled(false);
			System.out.println(toDisable.getEnabled());
			userRepo.saveAndFlush(toDisable);
			disabled = true;
			return disabled;
		}
		return disabled;
	}

	@Override
	public List<User> findUsersUsernameSearch(String keyword) {
		List<User> searchMatches = userRepo.findByUsernameLike(keyword);
		return searchMatches;
	}

	@Override
	public List<User> findAllUsers() {
		return userRepo.findAll();
	}

	@Override
	public List<Stock> addUserStock(String username, Stock stock) {
		User managedUser = userRepo.findByUsername(username);
		if(managedUser != null) {
			managedUser.addStock(stock);
			userRepo.saveAndFlush(managedUser);
			return managedUser.getStocks();
		}
		return null;
	}
	
	public List<Webinar> findWebinarsUserIsGoingTo(String username) {
		return webRepo.findByUsersAttendingUsername(username);
	}
	
	public List<Post> findPostsByUser(int userId) {
		return postRepo.findByUserId(userId);
	}
	


	
 }
