
 document.getElementById("add-func").addEventListener("click", function(e) {
    e.preventDefault();
    const card_container = document.getElementById("new-cards-container");
    let new_card ='<div class="" id="funcion" style="border-bottom:solid 1px;"><div class="form-group row mt-4"><label class="col-sm-4" for="" >Movie ID:  </label><input type="text" name="movie_id"></div><div class="form-group row"><label class="col-sm-4">ID de cine</label><select name="cine_id"><option>1</option><option>2</option><option>3 </option></select></div><div class="form-group row"><label class="col-sm-4" for="" >Hora  </label><input type="datetime-local" name="datetime"></div></div>';
    card_container.innerHTML += new_card;
})

