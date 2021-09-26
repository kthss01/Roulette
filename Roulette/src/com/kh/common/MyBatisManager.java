package com.kh.common;

import java.io.IOException;
import java.io.Reader;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

// mybatis를 이용하여 sql을 실행시키는 객체(sqlSession)을 생성하는 코드
public class MyBatisManager {
	// mybatis의 진행 순서
	// sqlSessionFactoryBuilder => sqlSessionFactory => sqlSession
	// sqlSession 객체 생성기
	
	// 인스턴스 하나만 올리는 것을 싱글턴 패턴
	// 다른 곳에서 SqlSessionFactory 인스턴스 하면 서버 실행 중에는 계속 한 곳만 사용
	private static SqlSessionFactory instance = null;
	
	// 생성자를 private 막아버려 new 생성자로 인스턴스를 추가 생성 못하도록 막음
	private MyBatisManager() {
		super();
	}
	
	public static SqlSessionFactory getInstance() {
		Reader reader = null;

		try {
			String resource = "sql/sqlMap/sqlMapConfig.xml";
			// java resources의 src
			reader = Resources.getResourceAsReader(resource);
			// sqlSessionFactory 생성기
			instance = new SqlSessionFactoryBuilder().build(reader);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (reader != null) reader.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
		return instance;
	}
}
