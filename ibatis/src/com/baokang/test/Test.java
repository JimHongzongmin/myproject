package com.baokang.test;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.baokang.ServiceImpl.TestDAO;
import com.baokang.domain.Ibatis;
import com.baokang.service.IDAO;

public class Test {

    /**
     * @param args
     */
    public static void main(String[] args) {
        ApplicationContext context=new ClassPathXmlApplicationContext("applicationContext.xml");
        IDAO testDAOImpl=(IDAO)context.getBean("testDAO");

        //获得全查询列表
        System.out.println("获得全查询列表");
        List result=new ArrayList();
        result=testDAOImpl.getList();
        for (Iterator iter = result.iterator(); iter.hasNext();) {
            Ibatis element = (Ibatis) iter.next();
            System.out.println(element.getName());

        }    
        
       //根据用户名获得用户对象
        System.out.println("根据用户名获得用户对象");
        Ibatis ibatis=testDAOImpl.getByName("1");
        System.out.println(ibatis.getName());
        
       //根据id获得用户对象
        System.out.println("根据id获得用户对象");
        Ibatis ibatis1=testDAOImpl.getById("1");
        System.out.println(ibatis.getName());
        
       //新增用户对象
        System.out.println("-----------------");
        System.out.println("新增用户对象前");
        List result1=new ArrayList();
        result1=testDAOImpl.getList();
        for (Iterator iter = result1.iterator(); iter.hasNext();) {
            Ibatis element = (Ibatis) iter.next();
            System.out.println(element.getName());

        }    
        testDAOImpl.save(new Ibatis("3","3")); //新增用户
        System.out.println("新增用户对象后");
        List result2=new ArrayList();
        result2=testDAOImpl.getList();
        for (Iterator iter = result2.iterator(); iter.hasNext();) {
            Ibatis element = (Ibatis) iter.next();
            System.out.println(element.getName());
        }    
        System.out.println("-----------------");
        
        //删除用户对象
        System.out.println("-----------------");
        System.out.println("删除用户对象前");
        List result3=new ArrayList();
        result3=testDAOImpl.getList();
        for (Iterator iter = result3.iterator(); iter.hasNext();) {
            Ibatis element = (Ibatis) iter.next();
            System.out.println(element.getName());

        }    
        testDAOImpl.delete("3"); //删除用户
        System.out.println("删除用户对象后");
        List result4=new ArrayList();
        result4=testDAOImpl.getList();
        for (Iterator iter = result4.iterator(); iter.hasNext();) {
            Ibatis element = (Ibatis) iter.next();
            System.out.println(element.getName());
        }    
        System.out.println("-----------------");
        
        //更新用户对象
        System.out.println("-----------------");
        System.out.println("更新用户对象前");
        List result5=new ArrayList();
        result5=testDAOImpl.getList();
        for (Iterator iter = result5.iterator(); iter.hasNext();) {
            Ibatis element = (Ibatis) iter.next();
            System.out.println(element.getName());

        }    
        
        Ibatis ibatis3=testDAOImpl.getById("1");
        ibatis3.setName("new1");
        testDAOImpl.update(ibatis3);//更新用户对象
        
        
        System.out.println("更新用户对象后");
        List result6=new ArrayList();
        result6=testDAOImpl.getList();
        for (Iterator iter = result6.iterator(); iter.hasNext();) {
            Ibatis element = (Ibatis) iter.next();
            System.out.println(element.getName());
        }    
        System.out.println("-----------------");
        
     }

}

