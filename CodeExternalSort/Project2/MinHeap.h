#pragma once
#include<vector>
struct MinHeapNode {
	int element;
	int i;
};
class MinHeap
{
private:
	std::vector<MinHeapNode> harr;
	int heap_size;
public:
	MinHeap(std::vector<MinHeapNode> a, int size);
	void MinHeapify(int);
	int left(int i) { return (2 * i + 1); }
	int right(int i) { return (2 * i + 2); }
	MinHeapNode getMin() { return harr[0]; }
	void replaceMin(MinHeapNode x)
	{
		harr[0] = x;
		MinHeapify(0);
	}
};

