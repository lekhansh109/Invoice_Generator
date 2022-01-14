var idIndex = 0;
let addRow = document.getElementById("add_row");
addRow.addEventListener("click", addItem);
let parentList = document.getElementById("parent");
console.log(parentList.children);

let subTotals = [];

function addItem(e) {
  pID = "ig_price"+ idIndex;
  qID = "ig_qty"+ idIndex;
  sT_ID = "ig_total"+ idIndex;
  subTotals[idIndex] = sT_ID;
  
  let newtr = document.createElement("tr");
  newtr.innerHTML = `<td><input type="text" name='ig_productName' id="ig_productName" placeholder='Enter Product Name'
  class="form-control" />
</td>
<td><input type="number" name='ig_qty[]' id="${qID}" placeholder='Enter Qty'
  class="form-control qty" onchange ="calc_Subtotal(${pID},${qID},${sT_ID})" /></td>
<td><input type="number" name='ig_price[]' id="${pID}" placeholder='Enter Unit Price'
  class="form-control price" onchange ="calc_Subtotal(${pID},${qID},${sT_ID})" /></td>
<td><input type="number" name='ig_total[]' id="${sT_ID}" placeholder='0.00'
  class="form-control total" readonly />
</td>
<td>
 <button id='delete_row' class="pull-right btn btn-default" onclick="removeItem(this,${idIndex})">Delete Item</button>
</td>`;
idIndex++;
  parentList.appendChild(newtr);
}

function removeItem(currElement,index) {
  if(index<1){
    document.getElementById('ig_sub_total').value = 0;
    document.getElementById('ig_tax').value = 0;
	 document.getElementById('ig_tax_amount').value = 0;
	 document.getElementById('ig_total_amount').value = 0;
  }
  subTotals.splice(index, 1);
  calc_total();
  currElement.parentElement.parentElement.remove();
}

function calc_Subtotal(priceID,qtyID,subTotalID){
	var price = parseFloat(document.getElementById(priceID.id).value);
	var qty = parseInt(document.getElementById(qtyID.id).value);
	var total = price * qty;
	document.getElementById(subTotalID.id).value = total;
	calc_total()
}

function calc_total(){
	var total = 0 ;
     for (let index = 0; index < subTotals.length; index++) {
		 var stID = subTotals[index];
		 total = total + parseInt(document.getElementById(stID).value);
	 }
	 document.getElementById('ig_sub_total').value = total;
     var tax = document.getElementById('ig_tax').value;
	 console.log(tax);
	 var tax_Amt = (total*tax)/100;
	 document.getElementById('ig_tax_amount').value = tax_Amt;
	 var grand_Total = total + tax_Amt;
	 document.getElementById('ig_total_amount').value = grand_Total;
}

window.addEventListener('load', function() {
	document.querySelector('input[type="file"]').addEventListener('change', function() {
		if (this.files && this.files[0]) {
			var img = document.querySelector('img');
			img.onload = () => {
				URL.revokeObjectURL(img.src);  // no longer needed, free memory
			}
  
			img.src = URL.createObjectURL(this.files[0]); // set src to blob url
		}
	});
  });
