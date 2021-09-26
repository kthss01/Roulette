package com.kh.comment.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.kh.comment.model.vo.Comment;

public class CommentDao {
	// mybatis에서 리턴 타입을 ArrayList가 아닌 List로 해야함
	public List<Comment> selectAllComment(SqlSession session) {
		// SqlSession : mybatis로 sql을 실행시키는 객체
		
		// SqlSession을 이용하여 comment 네임스페이스의 selectAllComment 쿼리 실행
		List<Comment> list = null;
		
		list = session.selectList("comment.selectAllComment");
		
//		int cnt = session.selectOne("comment.test2");
//		System.out.println(cnt);
		
		return list;
	}
}
