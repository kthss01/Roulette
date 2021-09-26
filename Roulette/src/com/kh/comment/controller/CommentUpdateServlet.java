package com.kh.comment.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.kh.comment.model.service.CommentService;
import com.kh.comment.model.vo.Comment;

@WebServlet("/commentUpdate.do")
public class CommentUpdateServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		int cId = Integer.parseInt(request.getParameter("cId"));
		String password = request.getParameter("password");
		String content = request.getParameter("content");
		
		Comment comment = new CommentService().selectComment(cId);
		
		if (comment.getPassword().equals(password)) {
			int result = new CommentService().updateComment(cId, content);
			
			if (result > 0) {
				// 성공
				request.setAttribute("msg", "방명록 수정 성공");
			} else {
				// 실패
				request.setAttribute("msg", "방명록 수정 실패");
			}
		} else {
			// 비밀번호 틀림
			request.setAttribute("msg", "비밀번호 틀림");
		}
		request.getRequestDispatcher("/commentSelectList.do").forward(request, response);;
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
