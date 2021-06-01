<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\Sunstudy as SunstudyResource;
use App\Models\Image;
use App\Models\Sunstudy;

class SunstudyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Sunstudy::all();
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
            'name' => 'required',
            'time_per_image' => 'required',
            'start_time' => 'required',
            'sun_based_on_date' => 'required',
        ]);

        $sunstudy = new Sunstudy;
        $sunstudy->name = $request->name;
        $sunstudy->time_per_image = $request->time_per_image;
        $sunstudy->start_time = $request->start_time;
        $sunstudy->sun_based_on_date = $request->sun_based_on_date;
        $sunstudy->save();
        
        if ($request->has('images')) {
            foreach($request->images as $item) {
                $image = Image::findOrFail($item['id']);
                $image->sunstudy_id = $sunstudy->id;
                $image->save();
            }
        }

        $sunstudy->refresh();
        return $sunstudy;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Sunstudy::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'time_per_image' => 'required',
            'start_time' => 'required',
            'sun_based_on_date' => 'required',
        ]);

        $sunstudy = Sunstudy::findOrFail($id);
        $sunstudy->name = $request->name;
        $sunstudy->time_per_image = $request->time_per_image;
        $sunstudy->start_time = $request->start_time;
        $sunstudy->sun_based_on_date = $request->sun_based_on_date;
        $sunstudy->save();
        
        if ($request->has('images')) {
            foreach($request->images as $item) {
                $image = Image::findOrFail($item['id']);
                $image->sunstudy_id = $sunstudy->id;
                $image->save();
            }
        }

        return $sunstudy;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $sunstudy = Sunstudy::findOrFail($id);
        $sunstudy->delete();

        return response()->json([
            'status' => 'OK',
            'message' => 'Sunstudy deleted'
        ]);
    }
}
