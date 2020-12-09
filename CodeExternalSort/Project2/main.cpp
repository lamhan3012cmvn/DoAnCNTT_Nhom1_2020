
#include"MergeFile.h"


int main()
{
	int num_ways = 5;
	int run_size = 10;
	MergeFile* m = new MergeFile(num_ways, run_size);
	m->externalSort();
	return 0;
}
