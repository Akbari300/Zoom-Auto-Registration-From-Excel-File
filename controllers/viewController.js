exports.renderIndexPage = async(req,res, next)=>{
    

    res.status(200).render('upload',{
        // title: `${tour.name} Tour`,
        // tour:tour
    });
}