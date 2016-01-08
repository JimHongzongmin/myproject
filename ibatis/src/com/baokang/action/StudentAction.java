package com.baokang.action;


import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.baokang.domain.Student;
import com.baokang.service.StuDao;

public class StudentAction {
	
	private Student student;
	private StuDao stuDao;
	
	/**
	 * 查询数据
	 * @return
	 */
	public String list(){
		ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
		stuDao = (StuDao) context.getBean("StuDAO");
		HttpServletResponse response = ServletActionContext.getResponse();
		response.setCharacterEncoding("UTF-8");
		HttpServletRequest request = ServletActionContext.getRequest();
		List u = this.stuDao.queryByStu(this.student);
		System.out.println("student.number");
		request.setAttribute("list", u);
		return "list";
	}
	/**
	 * 插入数据
	 * @throws IOException 
	 */
	public String insert() throws IOException{
		ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
		stuDao = (StuDao) context.getBean("StuDAO");
		HttpServletRequest request = ServletActionContext.getRequest();
		List student = this.stuDao.insertStu(this.student);
		request.setAttribute("list", student);
		return "list";
	}
	/**
	 * 判断在数据库中是否已有账号了
	 * @throws IOException
	 */
	public void validatorId() throws IOException{
		ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
		HttpServletResponse response = ServletActionContext.getResponse();
		stuDao = (StuDao) context.getBean("StuDAO");
		HttpServletRequest request = ServletActionContext.getRequest();
		int number = Integer.valueOf(request.getParameter("student.number"));
		List<Student> stu = this.stuDao.queryByStu(this.student);
		System.out.println(number);
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/json");
		response.setDateHeader("Expires", 0);
		PrintWriter out = response.getWriter();
		for(Student s: stu){
			if(s.getNumber().equals(number)){
				out.println("{\"flag\":1}");
				out.flush();
				out.close();
			}
		}
		out.println("{\"flag\":0}");
		out.flush();
		out.close();
	}
	
	public Student getStudent() {
		return student;
	}
	public void setStudent(Student student) {
		this.student = student;
	}

}
