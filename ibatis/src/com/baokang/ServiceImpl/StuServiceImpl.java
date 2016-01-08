package com.baokang.ServiceImpl;

import java.util.List;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.baokang.domain.Student;
import com.baokang.service.StuDao;

public class StuServiceImpl extends SqlMapClientDaoSupport implements StuDao{
	/**
	 * 查询学生信息
	 */
	public List queryByStu(Student student){
	    return (List)getSqlMapClientTemplate().queryForList("getStudentByStu", student);
	}
	/**|
	 * 插入学生信息
	 */
	public List insertStu(Student student){
		return (List)getSqlMapClientTemplate().insert("insertStudent", student);
	}
}
