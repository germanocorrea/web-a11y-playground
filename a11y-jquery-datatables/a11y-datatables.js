/*
    a11y-jquery-datatables.js - Really simple script that improves accessibility in tables that use the jQuery Datatables plugin

    This script was originally written for
    improvements made in the library-php system,
    now called Sistema Bibliotecario (https://github.com/CTA-IFRS/Sistema-bibliotecario)
*/

var table = $('#datatable').DataTable({
    keys: true,
});

// Add aria-label to buttons
$('.paginate_button').find('a:first').each(function() {
    // If it is a button corresponding to a page, add a "Page X" label, where X is the page number
    if ($.isNumeric($(this)[0].innerHTML)) {
        $(this).attr('aria-label', 'Page ' + $(this)[0].innerHTML);
    } else {
        // This might not be necessary, so remove it if you want
        $(this).attr('aria-label', $(this)[0].innerHTML + ' page');
    }
});

// Add aria-selected to current active buttons (the current page)
$('.active').find('a:first').each(function() {
    $(this).attr('aria-selected', 'true');
});

/*

    Search input isn't accessible because you
    have no confirmation that the query is going
    to be searched in the table while you are typing.

    Therefore, the following code:
        - create a function to be used for searching
        - remove the search input
        - add a new search input, which uses a button for submitting the query and filtering the table with it

*/
function searchDatatable() {
    table.search($("#txtSearch").val()).draw();
    return false;
}
$('#datatable_filter').find('label:first').remove();
$('#datatable_filter').append('<form onsubmit="return searchDatatable()"><label for="txtSearch">Pesquisar</label> <input type="text" id="txtSearch" class="form-control"> <button  type="button" id="filter" class="btn btn-primary">OK</button></form>');
