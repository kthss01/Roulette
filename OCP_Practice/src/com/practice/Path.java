package com.practice;

import java.io.File;

public class Path {
	public static void main(String[] args) {
		File file = new File(".");
		System.out.println(file.getAbsolutePath());
		
		System.out.println(System.getProperty("user.dir"));
	}
}
