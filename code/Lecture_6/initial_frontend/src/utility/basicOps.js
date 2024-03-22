export default function basicOps(products, searchTerm, sortDir,  pageNum, pageSize) {
    if (products == null) {
        return;
    }
    /*************filtering -> hiding  products*************/
    let filteredArr = products;
    if (searchTerm != "") {
        filteredArr = filteredArr.filter((product) => {
            let lowerSearchTerm = searchTerm.toLowerCase();
            let lowerTitle = product.title.toLowerCase();
            return lowerTitle.includes(lowerSearchTerm);
        })
    }
    /***********************sorting -> rearrange**********************************/
    let filteredSortedArr = filteredArr;
    if (sortDir != 0) {
        // increasing 
        if (sortDir == 1) {
            filteredSortedArr = filteredSortedArr.sort(incComparator);
        }
        //    decreasing order
        else {
            filteredSortedArr = filteredSortedArr.sort(decComparator);
        }
    }
    /************************Pagination *********************/
    const totalPages = Math.ceil(filteredSortedArr.length / pageSize);
    const sidx = (pageNum - 1) * pageSize;
    const eidx = sidx + pageSize;

    const filteredSortedpaginatedArr = filteredSortedArr.slice(sidx, eidx);

    return { filteredSortedpaginatedArr, totalPages };
}


function incComparator(product1, product2) {
    if (product1.price > product2.price) {
        return 1
    } else {
        return -1;
    }
}
function decComparator(product1, product2) {
    if (product1.price < product2.price) {
        return 1
    } else {
        return -1;
    }
}