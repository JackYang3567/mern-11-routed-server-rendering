import mongoose from 'mongoose';

var issueSchema = mongoose.Schema({
    title:  {type:String, required: true, trim: true},
    owner:  {type:String,required: true, trim: true},
    status:  {type:String}, 
    effort:  {type:Number},
    created:  {type: Date, default: Date.now},
    completionDate:  {type: Date, default:""},
  
});


const validIssueStatus = {
    New: true,
    Open: true,
    Assigned: true,
    Fixed: true,
    Verified: true,
    Closed: true,
};
  
const issueFieldType = {
    id: 'required',
    status: 'required',
    owner: 'required',
    effort: 'optional',
    created: 'required',
    completionDate: 'optional',
    title: 'required',
};

issueSchema.methods.cleanupIssue = function(issue) {
    const cleanedUpIssue = {};
    Object.keys(issue).forEach(field => {
        if (issueFieldType[field]) cleanedUpIssue[field] = issue[field];
    });
    return cleanedUpIssue;
}
  
issueSchema.methods.convertIssue = function(issue) {
    if (issue.created) issue.created = new Date(issue.created);
    if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
    return issueSchema.methods.cleanupIssue(issue);
}
issueSchema.methods.validateIssue = function (issue) {
    for (const field in issueFieldType) {
        const type = issueFieldType[field];
        if (!type) {
            delete issue[field];
            
        } else if (type === 'required' && !issue[field]) {
            //throw new Error('======Test=====');
            return `${field} is required==.`;
        }
    }
  
    if (!validIssueStatus[issue.status])
        return `${issue.status} is not a valid status.`;
    return null;
}



var Issue = mongoose.model('Issue', issueSchema);
export default Issue;
