package com.kh.comment.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.kh.comment.model.dao.CommentDao;
import com.kh.comment.model.vo.Comment;
import com.kh.common.MyBatisManager;

public class CommentService {

	public List<Comment> selectAllComment() {
		SqlSession session = MyBatisManager.getInstance().openSession();
		
		List<Comment> list = new CommentDao().selectAllComment(session);
		
		session.close();
		
		return list;
	}

}
