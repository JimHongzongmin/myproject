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

        //���ȫ��ѯ�б�
        System.out.println("���ȫ��ѯ�б�");
        List result=new ArrayList();
        result=testDAOImpl.getList();
        for (Iterator iter = result.iterator(); iter.hasNext();) {
            Ibatis element = (Ibatis) iter.next();
            System.out.println(element.getName());

        }    
        
       //�����û�������û�����
        System.out.println("�����û�������û�����");
        Ibatis ibatis=testDAOImpl.getByName("1");
        System.out.println(ibatis.getName());
        
       //����id����û�����
        System.out.println("����id����û�����");
        Ibatis ibatis1=testDAOImpl.getById("1");
        System.out.println(ibatis.getName());
        
       //�����û�����
        System.out.println("-----------------");
        System.out.println("�����û�����ǰ");
        List result1=new ArrayList();
        result1=testDAOImpl.getList();
        for (Iterator iter = result1.iterator(); iter.hasNext();) {
            Ibatis element = (Ibatis) iter.next();
            System.out.println(element.getName());

        }    
        testDAOImpl.save(new Ibatis("3","3")); //�����û�
        System.out.println("�����û������");
        List result2=new ArrayList();
        result2=testDAOImpl.getList();
        for (Iterator iter = result2.iterator(); iter.hasNext();) {
            Ibatis element = (Ibatis) iter.next();
            System.out.println(element.getName());
        }    
        System.out.println("-----------------");
        
        //ɾ���û�����
        System.out.println("-----------------");
        System.out.println("ɾ���û�����ǰ");
        List result3=new ArrayList();
        result3=testDAOImpl.getList();
        for (Iterator iter = result3.iterator(); iter.hasNext();) {
            Ibatis element = (Ibatis) iter.next();
            System.out.println(element.getName());

        }    
        testDAOImpl.delete("3"); //ɾ���û�
        System.out.println("ɾ���û������");
        List result4=new ArrayList();
        result4=testDAOImpl.getList();
        for (Iterator iter = result4.iterator(); iter.hasNext();) {
            Ibatis element = (Ibatis) iter.next();
            System.out.println(element.getName());
        }    
        System.out.println("-----------------");
        
        //�����û�����
        System.out.println("-----------------");
        System.out.println("�����û�����ǰ");
        List result5=new ArrayList();
        result5=testDAOImpl.getList();
        for (Iterator iter = result5.iterator(); iter.hasNext();) {
            Ibatis element = (Ibatis) iter.next();
            System.out.println(element.getName());

        }    
        
        Ibatis ibatis3=testDAOImpl.getById("1");
        ibatis3.setName("new1");
        testDAOImpl.update(ibatis3);//�����û�����
        
        
        System.out.println("�����û������");
        List result6=new ArrayList();
        result6=testDAOImpl.getList();
        for (Iterator iter = result6.iterator(); iter.hasNext();) {
            Ibatis element = (Ibatis) iter.next();
            System.out.println(element.getName());
        }    
        System.out.println("-----------------");
        
     }

}

