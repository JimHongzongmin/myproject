package com.baokang.service;

import java.util.List;

import com.baokang.domain.Ibatis;

public interface IDAO {
	public List getList();
	  public Ibatis getByName(String name);
	  public Ibatis getById(String id);
	  public void save(Ibatis ibatis);
	  public void delete(String id);
	  public void update(Ibatis ibatis);

}
