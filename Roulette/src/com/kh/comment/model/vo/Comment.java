package com.kh.comment.model.vo;

import java.sql.Date;

import lombok.Data;

@Data
public class Comment {
	private int id;
	private String ip;
	private String writer;
	private String password;
	private String content;
	private Date postDate;
	private String isDelete;
	private int parentId;
}
