/**
 * 
 */
package com.prodemy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.prodemy.model.Mahasiswa;
import com.prodemy.service.MahasiswaService;

/**
 * @author wyant
 *
 */
@RestController
public class MahasiswaController {
	@Autowired
	private MahasiswaService mhsService;
	
	@RequestMapping("/mhs")
	public List<Mahasiswa> getAllMahasiswa(){
		System.out.println("getAllMhs");
		return mhsService.getAllMahasiswa();
	}
	
	@RequestMapping("/mhs/{id}")
	public Mahasiswa getMahasiswa(@PathVariable int id){
		return mhsService.getMahasiswa(id);
	}
	
	@RequestMapping(value="/mhs", method=RequestMethod.POST)
	public void insertMhs(@RequestBody Mahasiswa mhs) {
		mhsService.insert(mhs);
	}
	
	@RequestMapping(value="/mhs", method=RequestMethod.PUT)
	public void editMhs(@RequestParam int id, @RequestBody Mahasiswa mhs) {
		mhsService.update(mhs, id);
	}
	
	@RequestMapping(value="/mhs", method=RequestMethod.DELETE)
	public void deleteMhs(@RequestParam int id) {
		mhsService.deleteById(id);
	}
}
