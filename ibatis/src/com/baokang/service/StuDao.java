package com.baokang.service;

import java.util.List;

import com.baokang.domain.Student;

public interface StuDao {
	public List queryByStu(Student student);
	public List insertStu(Student student);
}
