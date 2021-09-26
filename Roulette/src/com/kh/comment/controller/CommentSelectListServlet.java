package com.kh.comment.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.kh.comment.model.service.CommentService;
import com.kh.comment.model.vo.Comment;
import com.kh.comment.model.vo.PageInfo;

@WebServlet("/commentSelectList.do")
public class CommentSelectListServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		PageInfo pi = getPageInfo(request);
		
		List<Comment> list = new CommentService().selectAllComment(pi);
		
//		System.out.println(list.size());
		
		request.setAttribute("list", list);
		request.setAttribute("pi", pi);
		request.getRequestDispatcher("views/comment/comment.jsp").forward(request, response);
	}

	private PageInfo getPageInfo(HttpServletRequest request) {
		// 페이징
		int listCount;
		int currentPage;
		int startPage;
		int endPage;
		int maxPage;

		int pageLimit;
		int boardLimit;

		listCount = new CommentService().getListCount();

		currentPage = 1;

		if (request.getParameter("currentPage") != null) {
			currentPage = Integer.parseInt(request.getParameter("currentPage"));
		}

		pageLimit = 5;
		boardLimit = 3;

		maxPage = (int) Math.ceil((double) listCount / boardLimit);
		startPage = (currentPage - 1) / pageLimit * pageLimit + 1;
		endPage = startPage + pageLimit - 1;

		if (maxPage < endPage) {
			endPage = maxPage;
		}
		
		return new PageInfo(listCount, currentPage, startPage, endPage, maxPage, pageLimit, boardLimit);
	}

}
