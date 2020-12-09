#pragma once
#include"MinHeap.h"
#include<string>
#include <time.h>
#include<iostream>
#include<stdio.h>
#pragma warning(disable : 4996)

class MergeFile
{
private:
	int num_ways;
	int run_size ;
	std::string input_file;
	std::string output_file;
	void createInitialRuns();
	FILE* openFile(std::string fileName, std::string mode);
	void mergeFiles();
	void init();
public:
	void externalSort();
	MergeFile(int, int);

};

