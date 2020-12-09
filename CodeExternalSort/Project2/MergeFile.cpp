#include "MergeFile.h"

void merge(int arr[], int l, int m, int r)
{
	int i, j, k;
	int n1 = m - l + 1;
	int n2 = r - m;
	std::vector<int> L, R;
	for (i = 0; i < n1; i++)
		L.push_back(arr[l + i]);
	for (j = 0; j < n2; j++)
		R.push_back(arr[m + 1 + j]);
	i = 0;
	j = 0;
	k = l;
	while (i < n1 && j < n2) {
		if (L[i] <= R[j])
			arr[k++] = L[i++];
		else
			arr[k++] = R[j++];
	}
	while (i < n1)
		arr[k++] = L[i++];
	while (j < n2)
		arr[k++] = R[j++];
}
void mergeSort(int arr[], int l, int r)
{
	if (l < r) {
		int m = l + (r - l) / 2;
		mergeSort(arr, l, m);
		mergeSort(arr, m + 1, r);
		merge(arr, l, m, r);
	}
}
FILE* MergeFile::openFile(std::string fileName, std::string mode)
{
	FILE* fp = fopen(fileName.c_str(), mode.c_str());
	if (fp == NULL) {
		perror("Error while opening the file.\n");
		exit(EXIT_FAILURE);
	}
	return fp;
}

void  MergeFile::createInitialRuns()
{
	FILE* in = openFile(this->input_file.c_str(), "r");
	std::vector<FILE*>out;
	for (int i = 0; i < num_ways; i++)
		out.push_back(openFile(std::to_string(i), "w"));
	int* arr = new int[run_size];
	bool more_input = true;
	int next_output_file = 0;
	int i;
	while (more_input) {//seek
		for (i = 0; i < run_size; i++) {
			if (fscanf(in, "%d ", &arr[i]) != 1) {
				more_input = false;
				break;
			}
		}
		mergeSort(arr, 0, i - 1);
		for (int j = 0; j < i; j++)
			fprintf(out[next_output_file],
				"%d ", arr[j]);
		next_output_file++;
	}
	for (int i = 0; i < num_ways; i++)
		fclose(out[i]);
	fclose(in);
}
void MergeFile::mergeFiles()
{
	std::vector<FILE*> in;
	int k = this->num_ways;
	for (int i = 0; i < k; i++)
		in.push_back(openFile(std::to_string(i), "r"));
	FILE* out = openFile(this->output_file, "w");
	std::vector<MinHeapNode> harr;
	int i;
	for (i = 0; i < k; i++) {
		MinHeapNode har;//element and indexFile
		if (fscanf_s(in[i], "%d ", &har.element) != 1)
			break;
		har.i = i;
		harr.push_back(har);
	}
	MinHeap hp(harr, i);
	int count = 0;
	while (count != k) {//Đọc hết k file thì dừng
		MinHeapNode root = hp.getMin();//Get min trong MinHeap
		fprintf(out, "%d ", root.element);//Write Output
		if (fscanf(in[root.i], "%d ",
			&root.element)//Đọc số kế tiếp của root.element trong file root.i
			!= 1) {
			root.element = INT_MAX;
			count++;
		}
		hp.replaceMin(root);
	}
	for (int i = 0; i < k; i++)
	{
		fclose(in[i]);
		remove(std::to_string(i).c_str());//Xóa file num_ways
	}
	fclose(out);
}

void MergeFile::externalSort()
{
	//readFile Input chia thành num_ways nhỏ và những file tạm này được sắp xếp từ nhỏ đến lớn
	createInitialRuns();
	//Gộp thành file lớn từ các file nhỏ num_ways vừa xóa
	mergeFiles();
}
void MergeFile::init()
{
	this->input_file = "input.txt";
	this->output_file = "output.txt";
	FILE* in = openFile(this->input_file, "w");
	srand(time(NULL));
	for (int i = 0; i < num_ways * run_size; i++)
		fprintf(in, "%d ", rand());
	fclose(in);
}

MergeFile::MergeFile(int num_ways, int run_size)
{
	this->num_ways = num_ways;
	this->run_size = run_size;
	init();
}
