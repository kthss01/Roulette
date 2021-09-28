package com.kh.comment.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.kh.comment.model.service.CommentService;
import com.kh.comment.model.vo.Comment;

@WebServlet("/commentDelete.do")
public class CommentDeleteServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		int cId = Integer.parseInt(request.getParameter("id"));
		String password = request.getParameter("commentPassword");
		
//		System.out.println(id + " " + password);
		
		Comment comment = new CommentService().selectComment(cId);
		
		if (comment == null) {
			request.getSession().setAttribute("msg", "해당 하는 게시글이 없습니다.");
		} else {
			if (comment.getPassword().equals(password)) {
				int result = new CommentService().deleteComment(cId);
				
				if (result > 0) {
					request.getSession().setAttribute("msg", "방명록 삭제 성공");
				} else {
					request.getSession().setAttribute("msg", "방명록 삭제 실패");
				}
			} else {
				request.getSession().setAttribute("msg", "비밀번호가 일치하지 않습니다");
			}
		}
		
		response.sendRedirect(request.getContextPath() + "/commentSelectList.do");
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
