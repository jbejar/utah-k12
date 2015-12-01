
function TestingModel(source){
    this.sourceDocument = source;
    this.theirDocument = "";
    //If what the user has typed so far, equal to how far they got
    this.isAccurate = function(){
        return true;
    };
    //Set theirDocument to whatever they typed
    this.setTheirDocument = function(theirDocument){
        this.theirDocument = theirDocument;
        console.log(this.theirDocument);
    };
    //Return percentage of completion
    this.progress = function(){
        return (this.theirDocument.length / this.sourceDocument.length) * 100;
    };
    //Evaluate theirDocument and check if it is equal to the source document
    this.evaluate = function(){
        if (this.sourceDocument.slice(0, this.theirDocument.length) == this.theirDocument){
            return true;
        }
        else{
            return false;
        }
    }
}
var sourceDocument = "Ten letter";
QUnit.test( "Accuracy", function( assert ) {
    var model = new TestingModel(sourceDocument);

    assert.equal(model.isAccurate(), true);
    assert.equal(model.sourceDocument, sourceDocument);
    model.setTheirDocument("T");
    assert.equal(model.progress(), 10);
    model.setTheirDocument("Ten");
    assert.equal(model.progress(), 30);
    assert.equal(model.evaluate(), true);
    model.setTheirDocument("Tenrbgso");
    assert.equal(model.evaluate(), false);
    assert.equal(model.progress(), 80);
});