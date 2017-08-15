import $ from 'jquery';

export default (e) => {
		let table, tableID, rows, column, switching, j, i, x, y, shouldSwitch, columnIndex;

		tableID = $(e.target).closest('table').attr('id');
		table = document.getElementById(tableID);

		const sortableColumn = e.target.parentNode.id;

		const columns = table.getElementsByTagName('TH');
		for (j = 0; j < (columns.length - 1); j++) {
			column = columns[j];
			if (column.id === sortableColumn){
				columnIndex = j
			}
			
		}


		//console.log(column, table);
		switching = true;
		  /*Make a loop that will continue until
		  no switching has been done:*/
		while (switching) {
		    //start by saying: no switching is done:
		    switching = false;
		    rows = table.getElementsByTagName("TR");



		    /*Loop through all table rows (except the
		    first, which contains table headers):*/
		    for (i = 1; i < (rows.length - 1); i++) {
		      //start by saying there should be no switching:
		      shouldSwitch = false;
		      // Get the two elements you want to compare,
		      // one from current row and one from the next:



		      x = rows[i].getElementsByTagName("TD")[columnIndex];
		      y = rows[i + 1].getElementsByTagName("TD")[columnIndex];
		      //console.log(x)
		      //check if the two rows should switch place:
		      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
		        //if so, mark as a switch and break the loopkey: "value", 
		        shouldSwitch= true;
		        break;
		      }
		    }
		    if (shouldSwitch) {
		      /*If a switch has been marked, make the switch
		      and mark that a switch has been done:*/
		      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		      switching = true;
		    }
		}
	}