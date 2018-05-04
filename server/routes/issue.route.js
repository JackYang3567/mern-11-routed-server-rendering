import express from 'express';
const router = express.Router();

import issueModel from '../models/issue.model';

  
router.get('/api/issues', (req, res) => {
// const metadata = { total_count: issues.length };
// res.json({ _metadata: metadata, records: issues });
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    if (req.query.effort_lte || req.query.effort_gte) filter.effort = {};
    if (req.query.effort_lte) filter.effort.$lte = parseInt(req.query.effort_lte, 10);
    if (req.query.effort_gte) filter.effort.$gte = parseInt(req.query.effort_gte, 10);

    issueModel.find(filter,function (err,issues) {

        if(err){
            console.log(err);
        }else{
    
            const metadata = { total_count: issues.length };
            res.json({ _metadata: metadata, records: issues });
        }
        
    });
});

router.get('/api/issues/:id', (req, res) => {
    let issueId;
    try {
        issueId = req.params.id;
    } catch (error) {
        res.status(422).json({ message: `Invalid issue ID format: ${error}` });
        return;
    }
    
    issueModel.findOne({_id:issueId},function (err,issue) {
        if(err){
            console.log(err);
        }else{
            
            if (!issue) res.status(404).json({ message: `No such issue: ${issueId}` });
            else res.json(issue);
        }
    });
});
  
router.post('/api/issues', (req, res) => {
     
    let data;
  
    let issue = new issueModel(req.body);
    if (!issue.status)
        issue.status = 'New';

    const err = issue.validateIssue(issue)
    if (err) {
        res.status(422).json({ message: `Invalid requrest: ${err}` });
        return;
    }

    issue.save(function(err) {
        if (err){
            console.log(err);
        } else {
            res.json(issue);
        }
    });
});


router.put('/api/issues/:id', (req, res) => {
    let issueId;
    try {
        issueId = req.params.id;
    } catch (error) {
        res.status(422).json({ message: `Invalid issue ID format: ${error}` });
        return;
    }
  
    const issue = new issueModel(req.body);
   
    delete issue._id;
  
    const err =  issue.validateIssue(issue);
    if (err) {
        res.status(422).json({ message: `Invalid request: ${err}` });
        return;
    }
    issue.convertIssue(issue);
   
    issueModel.update({ _id: issueId }, 
        {$set:{title:req.body.title,
            owner:req.body.owner,
            status:req.body.status,
            effort:req.body.effort,
            completionDate:req.body.completionDate,
            update:true}},
        {upsert:false,multi:false}).exec(function (err,issue) {
        
        if (err){
            //console.log(err);
            //console.log("err====",err);
        } else {
            //console.log("ok====",issue);
            res.json(issue);
        }
    });

        
});

router.delete('/api/issues/:id', (req, res) => {
    let issueId;
    try {
        issueId = req.params.id;
    } catch (error) {
        res.status(422).json({ message: `Invalid issue ID format: ${error}` });
        return;
    }
  
    issueModel.remove({_id:issueId}).exec(function (err,issue) {
        if(err){
            console.log(err);
            res.status(500).json({ message: `Internal Server Error: ${err}` });
        }else {
    
            res.json({ status: 'OK' });
        }
       
    });
});
export default router;


