import { Request, Response } from 'express'
import fs from 'fs-extra';
import path from 'path'
// Models
import User, { ILand } from '../1.models/7_land';

//createController/////////////////////////////////////////////////////////////////////////
export async function createController(req: Request, res: Response): Promise<Response> {
    const { title, description, user } = req.body;
    //console.log(req.body);
    const newDate = { title, description, user};
    const data = new User(newDate);
    await data.save();
    return res.json({
        data
    });
};

//getsController/////////////////////////////////////////////////////////////////////////
export async function getsController(req: Request, res: Response): Promise<Response> {
    const Document = await User.find();
    return res.json(Document);
}

//getupdateController/////////////////////////////////////////////////////////////////////////
export async function getupdateController(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const Document = await User.findById(id);
    return res.json(Document);
}

//deleteController/////////////////////////////////////////////////////////////////////////
export async function deleteController(req: Request, res: Response): Promise<Response> {
    const { ObjectId } = require("mongodb");
    const id = ObjectId(req.params.id);

    const File = await User.findByIdAndRemove(id) as ILand;
    if (File) {
        try {
            await fs.unlink(path.resolve(File.file));
        } catch (err) {
            console.error(err);
        }
    }
    return res.json({ message: 'Ok remove' });
};

//updateController/////////////////////////////////////////////////////////////////////////
export async function updateController(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const {  title, description } = req.body;
    const updatedCurse = "";
    if (req.file) {
        const File = await User.findById(id) as ILand;
        if (File) {
            try {
                await fs.unlink(path.resolve(File.file));
            } catch (err) {
                console.error(err);
            }
        }
        const updatedCurse = await User.findByIdAndUpdate(id, { title, description, foto: req.file.path });
    } else {
        const updatedCurse = await User.findByIdAndUpdate(id, { title, description  });
    }
    return res.json({
        message: 'Successfully updated'
    });
}


