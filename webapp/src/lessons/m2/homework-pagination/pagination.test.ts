describe.skip('Pagination', function(){
    it("should show ellipsis on the left when at least 8 pages and current page is 4", function(){});
    it("should show ellipsis on the right when at least 8 pages and current page is 3", function(){});
    it("should show all pages when number of pages is less then 8", function(){});
    it("should show page -1 and +1 when at least 8 pages and we are not in 3...n-3", function(){});
    it("shouldn't show ellipsis on the left when we are on the 4th page", function(){});
    it("shouldn't show ellipsis on the right when we are on the n-4 page", function(){});
    
    it("should disable next button when on the last page", function(){});
    it("should disable previous button when on the first page", function(){});
    
    it("should call callback on click", function(){});
    it("shouldn't call callback on click when disabled", function(){});
});
