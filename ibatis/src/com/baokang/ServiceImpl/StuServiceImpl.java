package com.baokang.ServiceImpl;

import java.util.List;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.baokang.domain.Student;
import com.baokang.service.StuDao;

public class StuServiceImpl extends SqlMapClientDaoSupport implements StuDao{
	/**
	 * ��ѯѧ����Ϣ
	 */
	public List queryByStu(Student student){
	    return (List)getSqlMapClientTemplate().queryForList("getStudentByStu", student);
	}
	/**|
	 * ����ѧ����Ϣ
	 */
	public List insertStu(Student student){
		return (List)getSqlMapClientTemplate().insert("insertStudent", student);
	}
}
