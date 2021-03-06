package com.skilldistillery.stockoverflow.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

public class WebinarRatingTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private WebinarRating webinarRating;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("StockOverflowPU");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		webinarRating = em.find(WebinarRating.class, new WebinarRatingId(1,1));
	}

	@AfterEach
	void tearDown() throws Exception {
		webinarRating = null;
		em.close();
	}

	@Test
	void test_WebinarRating_entity_mapping() {
		assertNotNull(webinarRating);
		assertEquals(5, webinarRating.getRating());
		assertEquals("Very cool Rich thank you", webinarRating.getRatingNote());
		assertEquals("2020-06-05T09:26", webinarRating.getCreatedAt().toString());
	}
	
	@DisplayName("Test Webinar Rating to a User and a Webinar")
	@Test
	void test2() {
		assertEquals("Admin",webinarRating.getUser().getFirstName());
		assertEquals("Day Trading 101",webinarRating.getWebinar().getTitle());
	}
}
