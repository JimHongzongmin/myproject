package com.baokang.ServiceImpl;

import java.util.List;

import org.springframework.orm.ibatis.support.SqlMapClientDaoSupport;

import com.baokang.domain.Ibatis;
import com.baokang.service.IDAO;

public class TestDAO extends SqlMapClientDaoSupport implements IDAO {

    public void delete(String id) {
        getSqlMapClientTemplate().delete("deleteUsers", id);
    }

    public Ibatis getById(String id) {
        return (Ibatis)getSqlMapClientTemplate().queryForObject("getUsersById",id);
    }

    public Ibatis getByName(String name) {
        
        return (Ibatis)getSqlMapClientTemplate().queryForObject("getUsersByName",name);
    }

    public List getList() {
        return getSqlMapClientTemplate().queryForList("getAllUsers",null);
    }

    public void save(Ibatis ibatis) {
        getSqlMapClientTemplate().insert("insertUsers",ibatis);
    }

    public void update(Ibatis ibatis) {
        getSqlMapClientTemplate().update("updateUsers", ibatis);
    }

}
