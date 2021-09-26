package com.kh.comment.model.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.kh.comment.model.dao.CommentDao;
import com.kh.comment.model.vo.Comment;
import com.kh.comment.model.vo.PageInfo;
import com.kh.common.MyBatisManager;

public class CommentService {

	public List<Comment> selectAllComment(PageInfo pi) {
		SqlSession session = MyBatisManager.getInstance().openSession();

		List<Comment> list = new CommentDao().selectAllComment(session, pi);

		session.close();

		return list;
	}

	public int getListCount() {
		SqlSession session = MyBatisManager.getInstance().openSession();

		int result = new CommentDao().getListCount(session);

		session.close();

		return result;
	}

}
