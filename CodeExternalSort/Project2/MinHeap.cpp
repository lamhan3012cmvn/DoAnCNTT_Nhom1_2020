#include "MinHeap.h"
void swap(MinHeapNode* x, MinHeapNode* y)
{
	MinHeapNode temp = *x;
	*x = *y;
	*y = temp;
}
MinHeap::MinHeap(std::vector<MinHeapNode> a, int size)
{
	heap_size = size;
	harr = a;
	int i = (heap_size - 1) / 2;//Mid
	while (i >= 0) {
		MinHeapify(i);
		i--;
	}
}
void MinHeap::MinHeapify(int i)
{
	int l = left(i);
	int r = right(i);
	int smallest = i;
	if (l < heap_size && harr[l].element < harr[i].element)
		smallest = l;
	if (r < heap_size && harr[r].element < harr[smallest].element)
		smallest = r;
	if (smallest != i) {
		swap(&harr[i], &harr[smallest]);
		MinHeapify(smallest);
	}
}