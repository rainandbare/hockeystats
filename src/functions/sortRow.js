import $ from 'jquery';

export default (columns) => {
	//console.log(columns);

	let status = "none"
	if (columns.length === 1){
		status = "singleSort"
	} else if (columns.length === 2) {
		status = "doubleSort"
	}

	var rows = $("table#playerInfo tbody tr").detach().get();

    switch  (status) {
      case "singleSort":
        rows.sort(sortByOneColumn);
        break;
      case "doubleSort":
        rows.sort(sortByTwoColumns);
        break;
      case "none":
      	break;
    }

	$("table#playerInfo tbody").append(rows);
	
	function sortByOneColumn(row1, row2) {
		console.log("sortByOne")
		// console.log(row1, row2)
	    var v1, v2;
	    v1 = $(row1).children("td.sortingBy").text().toLowerCase();
	    v2 = $(row2).children("td.sortingBy").text().toLowerCase();

	    console.log(v1, v2)
	    if (v1 === v2) return 0;
	    return v1 > v2 ? 1 : -1;

  	}

	   
	function sortByTwoColumns(row1, row2) {
		console.log("sortByTwo")
		 // columns[0].index)	    
		var v1, v2, r;
	    v1 = $(row1).children("td.sortingBy").text().toLowerCase();
	    v2 = $(row2).children("td.sortingBy").text().toLowerCase();
	    if (v1 === v2) {
	      	// if we have a tie in column 1 values, compare column 2 instead
	      	v1 = $(row1).children("td.sortingBy-2").text().toLowerCase();
		    v2 = $(row2).children("td.sortingBy-2").text().toLowerCase();
		}
		if (v1 === v2) return 0;
		return v1 > v2 ? 1 : -1;	
	}

}

