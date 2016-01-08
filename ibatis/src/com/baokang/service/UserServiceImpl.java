package com.baokang.service;

import com.baokang.domain.User;
import com.baokang.service.UserService;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;
public class UserServiceImpl extends SqlMapClientDaoSupport implements UserService {
	
	public User queryByUser(User user){
		return (User)getSqlMapClientTemplate().queryForObject("getUsersByYhm",user);
	}

}
