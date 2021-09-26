package com.kh.comment.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.kh.comment.model.service.CommentService;
import com.kh.comment.model.vo.Comment;

@WebServlet("/commentInsert.do")
public class CommentInsertServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String ip = request.getParameter("ip");
		String content = request.getParameter("content");
		String writer = request.getParameter("writer");
		String password = request.getParameter("password");
		
		Comment comment = new Comment();
		comment.setIp(ip);
		comment.setContent(content);
		comment.setWriter(writer);
		comment.setPassword(password);
		
		int result = new CommentService().insertComment(comment);
		if (result > 0) {
			// 성공
			request.getSession().setAttribute("msg", "방명록 작성 성공");
		} else {
			// 실패
			request.getSession().setAttribute("msg", "방명록 작성 실패");
		}
		response.sendRedirect(request.getContextPath() + "/commentSelectList.do");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
