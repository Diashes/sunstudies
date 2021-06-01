<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Sunstudy extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
          'id' => $this->id,
          'name' => $this->name,
          'time_per_image' => $this->time_per_image,
          'start_time' => $this->start_time,
          'sun_based_on_date' => $this->sun_based_on_date
        ];
    }
}
