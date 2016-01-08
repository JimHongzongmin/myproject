package com.baokang.action;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.struts2.ServletActionContext;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.baokang.domain.User;
import com.baokang.service.IDAO;
import com.baokang.service.UserService;

public class UserAction {
	private User user;
	@Resource
	private UserService userService;
//	private String msg;

	public String login() {
//		ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
//		userDao = (UserDao) context.getBean("userDAO");
//		User u = null;
//		u = this.userDao.queryByUser(this.user);
//		HttpServletRequest request = ServletActionContext.getRequest();
//		if (null != u && user.getMm().equals(u.getMm())) {
//			msg="µÇÂ¼³É¹¦"+u.getYhm();
//			return "login";
//		} else 
//			return "error";
		System.out.println(user.getMm());
		System.out.println(user.getYhm());
		User u = this.userService.queryByUser(user);
		System.out.println(u);
		return "login";

	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}
