<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Image::all();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $ids = explode(",", $id);
        $deleletedImages = [];

        foreach($ids as $id) {
            $image = Image::findOrFail($id);
            unlink(storage_path('app/public/images/'.$image->name));
            $image->delete();
            array_push($deleletedImages, $image);
        }

        return $deleletedImages;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'images' => 'required',
        ]);

        $uploadedImages = [];

        foreach($request->images as $uploadedImage) {
            $image = new Image;
            $image->name = time() . '.' . str_replace(' ', '_', $uploadedImage->getClientOriginalName());
            $image->path = 'storage/' . $uploadedImage->storeAs('images', $image->name, 'public');
            $image->save();
            array_push($uploadedImages, $image);
        }

        return $uploadedImages;
    }
}
