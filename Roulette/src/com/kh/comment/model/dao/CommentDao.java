package com.kh.comment.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.kh.comment.model.vo.Comment;
import com.kh.comment.model.vo.PageInfo;

public class CommentDao {
	// mybatis에서 리턴 타입을 ArrayList가 아닌 List로 해야함
	public List<Comment> selectAllComment(SqlSession session, PageInfo pi) {
		// SqlSession : mybatis로 sql을 실행시키는 객체
		 
		// SqlSession을 이용하여 comment 네임스페이스의 selectAllComment 쿼리 실행
		List<Comment> list = null;
		
		int startRow = (pi.getCurrentPage()-1) * pi.getBoardLimit() + 1;
		int endRow = startRow + pi.getBoardLimit() - 1;
		
		Map<String, Integer> map = new HashMap<>();
		map.put("rstart", startRow);
		map.put("rend", endRow);
		
		list = session.selectList("comment.selectAllComment", map);
		
//		int cnt = session.selectOne("comment.test2");
//		System.out.println(cnt);
		
		return list;
	}

	public int getListCount(SqlSession session) {
		int result = 0;
		
		result = session.selectOne("comment.getListCount");
		
		return result;
	}
}
